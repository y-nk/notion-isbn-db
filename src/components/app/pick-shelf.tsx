'use client'

import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
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

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const { title } = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    ) as Record<string, string>

    const res = await fetch('/api/shelf', {
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <div className="space-y-4">
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

        <hr />

        <form onSubmit={onSubmit} className="flex gap-4">
          <Input
            type="text"
            name="title"
            placeholder="or create a new one"
            className="flex-grow"
            required
          />

          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  )
}
