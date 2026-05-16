interface createInputProps extends Partial<Omit<HTMLInputElement, 'className'>> {
  className?: string;
}

export const createInput = (props: createInputProps) => {
  const { className, ...otherProps } = props;
  const input = document.createElement('input');

  input.className = `input ${className}`.trim();

  Object.assign(input, otherProps);

  return input;
};
