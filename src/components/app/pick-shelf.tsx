'use client'

import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import { DeveloperNotes } from '~/components/app/dev-notes'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useAsyncFn } from '~/hooks/use-async-fn'
import { useToast } from '~/hooks/use-toast'

type Props = {
  shelves: Array<{ id: string; title: string }>
}

export default function PickShelf({ shelves }: Props) {
  const { toast } = useToast()
  const router = useRouter()

  function redirect(id: string) {
    router.push(id)
  }

  const [onCreateShelf, createShelfState] = useAsyncFn(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()

      const { title } = Object.fromEntries(
        new FormData(evt.currentTarget).entries()
      ) as Record<string, string>

      const res = await fetch('/api/shelves', {
        method: 'POST',
        body: JSON.stringify({ title }),
      })

      if (!res.ok) {
        toast({ title: res.statusText })
      } else {
        const shelf = await res.json()
        redirect(shelf.id)
      }
    }
  )

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <h1 className='font-bold text-xl'>ISBN DB Editor</h1>

      <div className="mt-4 mb-10 py-4 space-y-4 border border-muted border-x-0">
        {!!shelves.length && (
          <>
            <Select onValueChange={redirect}>
              <SelectTrigger>
                <SelectValue placeholder="pick an existing bookshelf" />
              </SelectTrigger>
              <SelectContent>
                {shelves.map((shelf) => (
                  <SelectItem key={shelf.id} value={`/${shelf.id}`}>
                    {shelf.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex justify-center text-xs text-muted-foreground uppercase">Or</div>
          </>
        )}

        <form onSubmit={onCreateShelf} className="flex gap-4">
          <Input
            type="text"
            name="title"
            placeholder="create a new shelf"
            className="flex-grow"
            required
          />

          <Button loading={createShelfState.loading} type="submit">Create</Button>
        </form>
      </div>

      <DeveloperNotes />
    </div>
  )
}
