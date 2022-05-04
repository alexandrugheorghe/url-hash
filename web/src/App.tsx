import React, {
  ChangeEventHandler,
  FormEventHandler, useEffect,
  useState
} from 'react'
import { TinyUrlList, TinyUrl } from './components/TinyUrlList'
import { CreateUrlForm } from './components/CreateUrlForm'
import { ShortUrlsQuery, ShortenUrlMutation } from './queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import './App.css'

function App() {
  const [shortenUrlMutation, { loading: shortenUrlLoading, error: shortenUrlError }] = useMutation(ShortenUrlMutation)
  const [shortUrlsQuery, { loading: urlListLoading, error: urlListError }] = useLazyQuery(ShortUrlsQuery, {
    variables: {
      limit: 100,
      afterId: undefined
    }
  })
  const [url, setUrl] = useState<string>()
  const [urlList, setUrlList] = useState<Array<TinyUrl>>([])

  useEffect(() => {
    shortUrlsQuery().then(result => {
      setUrlList(result?.data?.shortUrls)
      console.log('=====> Lazy query:', result?.data?.shortUrls)
    })
  }, [url])

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    shortenUrlMutation({ variables: {
      longUrl: url
    }}).then((result) => {
      const newUrl = result.data.shortenUrl
      setUrlList(urlList ? [ ...urlList, newUrl] : [ newUrl ])
      setUrl('')
    })
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Tiny url list:
          {!urlListLoading && <TinyUrlList tinyUrls={urlList}/>}
          {urlListError && <p>Error while loading URL list.</p>}
        </div>
        <CreateUrlForm url={url} onSubmit={onSubmit} onChange={onChange} disabled={shortenUrlLoading}/>
        {shortenUrlError && <p>Error while submitting the new url. Try again.</p>}
      </header>
    </div>
  );
}

export default App;
