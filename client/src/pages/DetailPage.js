import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      console.log('Hello')
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {}
  }, [request, linkId, token])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  )
}
