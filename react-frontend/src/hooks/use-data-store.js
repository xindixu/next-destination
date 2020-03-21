import { useState, useCallback } from "react";
import qs from "qs";
import apiFetch from "../lib/api-fetch";

const getUrl = (url, params) => {
  const query = qs.stringify(params);
  if (query) {
    return url.indexOf("?") ? `${url}?${query}` : `${url}&${query}`;
  }
  return url;
};

const useDataStore = init => {
  const { url, params: initialParams, name, option = {} } = init();
  const [recordsByPage, setRecordsByPage] = useState([]);
  const [recordsCount, setRecordsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState(initialParams);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);

  const reset = () => {
    setRecordsByPage([]);
    setRecordsCount(1);
    setCurrentPage(1);
    setParams(initialParams);
    setComplete(false);
  };

  const onFetchSuccess = useCallback(
    ({ response }, page) => {
      setRecordsByPage({ ...recordsByPage, [page]: response[name] });
      setCurrentPage(page);
      setRecordsCount(response.total);
      setFetching(false);
      setError(false);
    },
    [name, recordsByPage]
  );

  const onFetchFail = useCallback(err => {
    setFetching(false);
    setError(true);
    throw err;
  }, []);

  const fetchWithUrl = useCallback(
    urlToFetch => apiFetch(urlToFetch, option),
    []
  );

  const fetchPage = useCallback(
    page => {
      if (recordsByPage[page]) {
        return setCurrentPage(page);
      }

      const newParams = {
        ...params,
        page
      };
      const newURL = getUrl(url, newParams);
      setParams(newParams);
      return fetchWithUrl(newURL)
        .then(resp => {
          onFetchSuccess(resp, page);
          return resp;
        })
        .catch(err => {
          onFetchFail(err);
          return err;
        });
    },
    [fetchWithUrl, onFetchFail, onFetchSuccess, params, recordsByPage, url]
  );

  const sort = sortOn => {
    if (sortOn === params.sort) {
      return;
    }
    reset();
    const newParams = {
      ...params,
      page: 1,
      sort: sortOn
    };
    const newURL = getUrl(url, newParams);

    setParams(newParams);
    fetchWithUrl(newURL)
      .then(resp => {
        onFetchSuccess(resp, 1);
        return resp;
      })
      .catch(err => {
        onFetchFail(err);
        return err;
      });
  };

  return [
    {
      recordsCount,
      pageRecords: recordsByPage[currentPage] || [],
      fetching,
      complete,
      currentPage
    },
    {
      fetchPage,
      sort
    }
  ];
};

export default useDataStore;
