import { useState } from 'react'

type State<T> = {
  type: 'idle' | 'loading' | 'fulfilled' | 'error'
  value?: T
  error?: unknown
}

export function useAsyncFn<Args, Returned>(
  fn: (args: Args) => Promise<Returned>
) {
  const [state, setState] = useState<State<Returned>>({ type: 'idle' })

  const executor = (args: Args) => {
    setState({
      type: 'loading',
      value: undefined,
      error: undefined,
    })

    fn(args)
      .then((value) => setState({ type: 'fulfilled', value }))
      .catch((error) => setState({ type: 'error', error }))
  }

  return [
    executor,
    {
      ...state,
      get loading() {
        return state.type === 'loading'
      },
    },
  ] as const
}
