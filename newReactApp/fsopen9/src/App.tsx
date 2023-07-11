import { HeaderProps, coursePart } from "./types";
import coursePartsData from "./data/data";

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Part = ({ coursePart }: { coursePart: coursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h1 key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </h1>
          <text>{coursePart.description}</text>
        </div>
      );
    case "group":
      return (
        <div>
          <h1 key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </h1>
          <text> Group Projects {coursePart.groupProjectCount}</text>
        </div>
      );
    case "background":
      return (
        <div>
          <h1 key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </h1>
          <text>{coursePart.description}</text>
          <text>Background Material: {coursePart.backgroundMaterial}</text>
        </div>
      );
    case "special":
      return (
        <div>
          <h1 key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </h1>
          <text>{coursePart.description}</text>
          <text>Required Skills: {coursePart.requirements}</text>
        </div>
      );
    default:
      return <></>;
  }
};

const Content = ({ content }: { content: coursePart[] }) => {
  const renderedContent = content.map((entry) => (
    <>
      <Part coursePart={entry} />
    </>
  ));
  return <div> {renderedContent}</div>;
};
const Total = ({ content }: { content: coursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: coursePart[] = coursePartsData;

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
