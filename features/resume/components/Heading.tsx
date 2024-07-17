function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-2xl font-bold text-gray-700">{children}</h3>;
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-700">
      {children}
    </h4>
  );
}

const Heading = { H3, H4 };

export { Heading };
