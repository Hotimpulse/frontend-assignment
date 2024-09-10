import spinner from "./spinner.module.scss";

export default function Spinner() {
  return (
    <div className={spinner['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
