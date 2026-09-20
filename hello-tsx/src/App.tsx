const Header = ({courseName}: {courseName: string}) => {
  return <h1>{courseName}</h1>;
}

const Content = ({courseParts}: {courseParts: {name: string, exerciseCount: number}[]}) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

const Total = ({totalFunction}: {totalFunction: () => number}) => {
  return (
    <p>Total number of exercises: {totalFunction()}</p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalFunction={() => totalExercises} />
    </div>
  );
};

export default App;