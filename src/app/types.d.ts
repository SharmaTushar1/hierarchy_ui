type Member = {
  id: string,
  name: string,
  phone_number: string,
  email: string,
  isLeader: boolean,
}

// Using this way we cannot have same names which was asked as a Bonus point in the assignment.

type Team = {
  [name: string]: [members: Member[]] // teamName: [{id, memberName, isLeader}]
}

type Head = { // type for all 3 heads: head of staff/hr, head of engineering, head of design
    id: string,
    name: string,
    phone_number: string,
    email: string,
    items: Team[] // teams under every head
}

type CEO = { // ceo
  id: string,
  name: string,
  phone_number: string,
  email: string,
  items: Head[]
}