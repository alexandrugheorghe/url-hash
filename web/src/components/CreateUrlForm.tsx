import React, {
  ChangeEventHandler,
  EventHandler,
  FormEventHandler,
  SyntheticEvent
} from 'react'

interface Props {
  url?: string
  disabled: boolean
  onSubmit: FormEventHandler
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CreateUrlForm = ( props: Props) => {
  return (<form onSubmit={props.onSubmit}>
    <label>URL:</label>
    <input type="text" value={props.url} onChange={props.onChange} />
    <input type="submit" value="Parse URL" disabled={props.disabled}/>
  </form>)
}
