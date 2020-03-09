// @flow
import * as React from "react";

type PropTypes = {
  title: string
};

export default function Title({ title }: PropTypes) {
  React.useEffect(() => {
    document.title = `${title} - Flaskr`;
  }, [title]);
  return [];
}
