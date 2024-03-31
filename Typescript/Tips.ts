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

/*
How to Create a Union From an Object's values:
*/

const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
  PLANNED_ONE_ON_ONE: 'planned1on1',
  PLANNED_SELF_DIRECTED: 'plannedSelfDirected',
} as const;

type IndividualProgram = (typeof programModeEnumMap)[
  | 'ONE_ON_ONE'
  | 'SELF_DIRECTED'
  | 'PLANNED_ONE_ON_ONE'
  | 'PLANNED_SELF_DIRECTED']; // '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'

/*
We can also use Exclude to create a union from an object's values:
*/

type GROUP_PROGRAMS = 'GROUP' | 'ANNOUNCEMENT';
type SINGLE_PROGRAMS = Exclude<keyof typeof programModeEnumMap, GROUP_PROGRAMS>;
type AlternativeIndividualProgram = (typeof programModeEnumMap)[SINGLE_PROGRAMS]; // '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'

// single type:
type AlternativeIndividualProgramInline = (typeof programModeEnumMap)[Exclude<
  keyof typeof programModeEnumMap,
  'GROUP' | 'ANNOUNCEMENT'
>];
