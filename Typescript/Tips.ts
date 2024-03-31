/*
Bind types with destructed function:
*/
function email({ person, subject, body }: { person: string; subject: string; body: string }) {
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
// @ts-ignore
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

/*
Use Two Operators With Indexed Access to Get All of an Object's Values
*/

const frontendToBackendEnumMap = {
  singleModule: 'SINGLE_MODULE',
  multiModule: 'MULTI_MODULE',
  sharedModule: 'SHARED_MODULE',
} as const;

type BackendModuleEnum = (typeof frontendToBackendEnumMap)[keyof typeof frontendToBackendEnumMap];

// more readable way:
type FrontentToBackend = typeof frontendToBackendEnumMap;
type BackendModuleEnumReadable = FrontentToBackend[keyof FrontentToBackend];

/*
How to create Unions out of Array Values
*/

// First: We use as const annotation to extract the literal types from the array instead of string types.
const fruits = ['apple', 'banana', 'orange'] as const;

// We can use the indexed access operator to get the type of a specific index in the array.
/* prettier-ignore */ type AppleOrBanana = typeof fruits[0 | 1]; // 'apple' | 'banana'

// Or we can use number as the index type to get all the values in the array.
/* prettier-ignore */ type Fruit = typeof fruits[number]; // 'apple' | 'banana' | 'orange'
