interface IProps {
  className?: string;
  text: string;
}

export default function Heading({ className, text }: IProps) {
  return (
    <h1
      className={`text-2xl inline-block font-bold mb-5 text-btnText ${className}`}
    >
      {text}
    </h1>
  );
}
