import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - JobHut`;
  }, [title]);
};

export default useDocumentTitle;
