import { FCC } from "@workspace/ui/@types";

export const Show: FCC<{ when?: boolean }> = (props) => (
  <>{props.when ? <>{props.children}</> : null}</>
);
