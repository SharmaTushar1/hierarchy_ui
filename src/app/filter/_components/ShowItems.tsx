const ShowItems = ({array}: {array: Employee[]}) => {
  return (
    <div>
      {array.map((item: Employee) => (
        <div className="border-8 border-red-800 m-4" key={item.id}>
          <div>
            ID: {item.id}
          </div>
          <div>
            Name: {item.name}
          </div>
          <div>
            Phone Number: {item.phone_number}
          </div>
          <div>
            Email: {item.email}
          </div>
          <div>
            position: {item.position}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowItems