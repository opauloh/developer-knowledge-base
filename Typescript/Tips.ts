/*
Bind types with destructed function:
*/
function email({
  person,
  subject,
  body,
}: {
  person: string;
  subject: string;
  body: string;
}) {
  console.log(person, subject, body);
}

/*
Declare Props in React components
*/
interface Props {
  id: number;
  title: string;
  poster: string;
}

const MovieCard: React.FC<Props> = ({ id, title, poster }) => ({});
