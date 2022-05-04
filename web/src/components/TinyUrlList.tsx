import React from 'react';

export interface TinyUrl {
  shortUrl: string,
  originalUrl: string
}

interface Props {
  tinyUrls?: Array<TinyUrl>
}

export const TinyUrlList = (props: Props) => {
  if (!props.tinyUrls) {
    return null
  }
  return (<ul>
    {props.tinyUrls.map((tinyUrl, index) =>
      (<li key={index} >{tinyUrl.originalUrl} {tinyUrl.shortUrl}</li>)
    )}
  </ul>)
}
