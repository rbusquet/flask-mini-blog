import React from "react";

export default function useTitle(title: string) {
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    document.title = `${title} - Flaskr`;
  }, [title]);
}
