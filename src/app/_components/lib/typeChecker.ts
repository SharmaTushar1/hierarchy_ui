// check if it's a team member or leader

const positions = ['Head of Design', 'Head of Engineering', 'Head of Staff']

export const isMember = (object: any): object is Member =>
  typeof object === "object" &&
  object !== null &&
  typeof object.id === "string" &&
  typeof object.name === "string" &&
  typeof object.phone_number === "string" &&
  typeof object.email === "string" &&
  typeof object.isLeader === "boolean";

export const isTeam = ( object: any ): object is Team =>
  typeof object === "object" &&
  object !== null &&
  typeof object.id === "string" &&
  typeof object.name === "string" &&
  !object.position &&
  Array.isArray(object.items) &&
  object.items.every((item: any) => isMember(item))

export const isHead = ( object: any ): object is Head =>
  typeof object === "object" &&
  object !== null &&
  typeof object.id === "string" &&
  typeof object.name === "string" &&
  typeof object.phone_number === "string" &&
  typeof object.email === "string" &&
  typeof object.position === "string" && positions.includes(object.position) && // it's either of the 3 heads
  Array.isArray(object.items) &&
  object.items.every((item: any) => isTeam(item));

export const isCEO = ( object: any ): object is CEO =>
  typeof object === "object" &&
  object !== null &&
  typeof object.id === "string" &&
  typeof object.name === "string" &&
  typeof object.phone_number === "string" &&
  typeof object.email === "string" &&
  typeof object.position === "string" && object.position === 'CEO' &&
  Array.isArray(object.items) &&
  object.items.every((item: any) => isHead(item));
