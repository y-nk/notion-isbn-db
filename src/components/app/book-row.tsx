import { Trash2 } from 'lucide-react'
import {
  useState,
  type FormEvent,
  type KeyboardEvent,
  type SyntheticEvent,
} from 'react'

import type { Book } from '~/lib/types'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { TableRow, TableCell } from '~/components/ui/table'
import { useAsyncFn } from '~/hooks/use-async-fn'
import { useToast } from '~/hooks/use-toast'

export type Props = {
  book: Book
  onEdited?: (book: Book) => void
  onDeleted?: (id: string) => void
}

export default function BookRow({ book, onEdited, onDeleted }: Props) {
  const { toast } = useToast()
  const [isEditing, setEditing] = useState(false)

  function onKeyUp(evt: KeyboardEvent<HTMLInputElement>) {
    if (evt.key === 'Escape') {
      evt.currentTarget.value = book.title!
      evt.currentTarget.blur()
    } else if (evt.key === 'Enter') {
      evt.currentTarget.blur()
    }
  }

  const [onEdit, editState] = useAsyncFn(
    async (evt: SyntheticEvent<HTMLInputElement>) => {
      const title = evt.currentTarget.value

      if (book.title !== title) {
        const res = await fetch(`/api/books/${book.id}`, {
          method: 'PUT',
          body: JSON.stringify({ title }),
        })

        if (res.ok) {
          toast({ title: 'Update complete!' })
          onEdited?.({ ...book, title })
        } else {
          toast({
            title: 'Oh no!',
            variant: 'destructive',
            description:
              'An error occurred while editing the title of the book',
          })
        }
      }

      setEditing(false)
    }
  )

  const [onDelete, deleteState] = useAsyncFn(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()

      const res = await fetch(`/api/books/${book.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast({ title: 'Book deleted!' })
        onDeleted?.(book.id)
      } else {
        toast({
          title: 'Oh no!',
          variant: 'destructive',
          description: 'An error occurred while deleting the book',
        })
      }
    }
  )

  const isLoading = editState.loading || deleteState.loading

  return (
    <TableRow key={book.id}>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>
        <Input
          name="title"
          className={!isEditing ? 'border-transparent shadow-none' : ''}
          defaultValue={book.title}
          placeholder={!book.title ? 'Untitled book' : ''}
          readOnly={!isEditing}
          onKeyUp={onKeyUp}
          disabled={isEditing && isLoading}
          onFocus={() => !isLoading && setEditing(true)}
          onBlur={onEdit}
        />
      </TableCell>
      <TableCell>
        <form onSubmit={onDelete}>
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            icon={<Trash2 className="h-4 w-4" />}
            loading={deleteState.loading}
          />
        </form>
      </TableCell>
    </TableRow>
  )
}
