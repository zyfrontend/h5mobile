export default function textOmit(textValue, to, from) {
  let a = textValue.substring(0, to);
  let a2 = textValue.substring(textValue.length - from, textValue.length);
  return `${a}...${a2}`;
}
