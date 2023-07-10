interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface coursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ content }: { content: coursePart[] }) => {
  const renderedContent = content.map((entry) => (
    <p key={entry.name}>
      {entry.name} {entry.exerciseCount}
    </p>
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
  const courseParts: coursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
