import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {loading, error, request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        // console.log(`data.link: ${data.link}`)
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <div className="input-field col s10">
        <input
          id="link"
          type="text"
          name="link"
          placeholder="Вставьте ссылку"
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
          value={link}
        />
        <label htmlFor="link">Введите ссылку</label>
      </div>
    </div>
  )
}
