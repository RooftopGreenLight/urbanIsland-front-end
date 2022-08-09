const ChatMessage = chatMessages => {
  return (
    <ul>
      {chatMessages.slice(-10).map(({ memberId, content, sendTime }, idx) => (
        <li>
          {memberId} {content} {sendTime}
        </li>
      ))}
    </ul>
  )
}
