type Member = {
  id: string,
  name: string,
  phone_number: string,
  email: string,
  isLeader: boolean,
}

// We will have to run a loop to check if the Team with a name is present to avoid duplicate team name that is in the Bonus point.

type Team = {
  id: string,
  name: string,
  items?: Member[] // teamName: [{id, memberName, isLeader}] items is just the list of members in the team
}

type Head = { // type for all 3 heads: head of staff/hr, head of engineering, head of design
    id: string,
    name: string,
    phone_number: string,
    email: string,
    position: string,
    items?: Team[] // teams under every head
}

type CEO = { // ceo
  id: string,
  name: string,
  phone_number: string,
  email: string,
  position: 'CEO',
  items?: Head[]
}