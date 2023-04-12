import React from "react";

export const LinkCard = ({link}) => {
  return (
    <>
      <p>Ваша ссылка: <a href={link.to}>{link.to}</a></p>
      <p>Откуда: <a href={link.from}>{link.from}</a></p>
      <p>Дата: {new Date(link.date).toLocaleDateString()}</p>

    </>
  )
}
