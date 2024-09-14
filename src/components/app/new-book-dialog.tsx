import { useState } from 'react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

import NewBookForm from '~/components/app/new-book-form'
import { PlusCircle } from 'lucide-react'
import type { Book } from '~/lib/types'

type Props = {
  onAdded?: (book: Book) => void
}

export default function NewBookDialog({ onAdded }: Props) {
  const [showModal, toggleModal] = useState(false)

  async function handleAdded(book: Book, keepAdding?: boolean) {
    if (!keepAdding) toggleModal(false)
    onAdded?.(book)
  }

  return (
    <Dialog open={showModal} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button icon={<PlusCircle className="h-4 w-4" />}>Add Entry</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <NewBookForm onAdded={handleAdded} />
      </DialogContent>
    </Dialog>
  )
}
