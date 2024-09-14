import { useParams } from 'next/navigation'
import { type FormEvent } from 'react'
import { useZxing } from 'react-zxing'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useAsyncFn } from '~/hooks/use-async-fn'
import { useToast } from '~/hooks/use-toast'
import type { Book } from '~/lib/types'

type Props = {
  onAdded?: (book: Book, keepAdding?: boolean) => void
}

export default function NewBookForm({ onAdded }: Props) {
  const { shelfId } = useParams()
  const { toast } = useToast()

  const [onAdd, addState] = useAsyncFn(
    async ({ isbn, keepAdding }: { isbn: string; keepAdding?: boolean }) => {
      const res = await fetch(`/api/shelves/${shelfId}/books`, {
        method: 'POST',
        body: JSON.stringify({ isbn }),
      })

      if (res.ok) {
        const book = await res.json()

        toast({ title: `New book added! (isbn: ${isbn})` })
        onAdded?.(book, keepAdding)
      } else {
        toast({
          title: 'Oh no!',
          variant: 'destructive',
          description: 'An error occurred while adding a new book',
        })
      }
    }
  )

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const { isbn } = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    ) as Record<string, string>

    onAdd({ isbn, keepAdding: false })
    evt.currentTarget.reset()
  }

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (!addState.loading) {
        onAdd({
          isbn: result.getText(),
          keepAdding: true,
        })
      }
    },
  })

  return (
    <div className="flex flex-col mt-4 gap-4">
      <form className="flex gap-4" onSubmit={onSubmit}>
        <Input
          name="isbn"
          className="w-full"
          placeholder="Enter ISBN"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={addState.loading}
        />

        <Button type="submit" loading={addState.loading}>
          Save
        </Button>
      </form>

      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or scan with your camera
        </span>
      </div>

      <div className="w-full max-w-sm rounded-sm overflow-hidden">
        <video ref={ref} className="w-full h-auto" />
      </div>
    </div>
  )
}
