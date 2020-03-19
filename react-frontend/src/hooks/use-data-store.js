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
  const { url, params: initialParams, name } = init();
  const [records, setRecords] = useState([]);
  const [recordsByPage, setRecordsByPage] = useState([]);
  const [recordsCount, setRecordsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState(initialParams);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);

  const reset = () => {
    setRecords([]);
    setRecordsByPage([]);
    setRecordsCount(1);
    setCurrentPage(1);
    setParams(initialParams);
    setComplete(false);
  };

  const onFetchSuccess = useCallback(
    ({ response }) => {
      setRecords([...records, ...response[name]]);
      setRecordsByPage({ ...recordsByPage, [currentPage]: response[name] });
      setRecordsCount(response.total);
      setFetching(false);
      setError(false);
    },
    [currentPage, name, records, recordsByPage]
  );

  const onFetchFail = useCallback(err => {
    setFetching(false);
    setError(true);
    throw err;
  }, []);

  const fetchWithUrl = useCallback(
    urlToFetch =>
      apiFetch(urlToFetch, {
        json: true,
        useApi: false,
        method: "GET"
      }),
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
        .then(resp => resp.json())
        .then(resp => {
          onFetchSuccess(resp);
          setCurrentPage(page);
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
    reset();
    console.log(sortOn);
    const newParams = {
      ...params,
      sort: sortOn
    };
    const newURL = getUrl(url, newParams);
    setParams(newParams);
    fetchWithUrl(newURL)
      .then(resp => resp.json())
      .then(resp => {
        onFetchSuccess(resp);
        setCurrentPage(1);
        return resp;
      })
      .catch(err => {
        onFetchFail(err);
        return err;
      });
  };

  return [
    {
      records,
      recordsCount,
      pageRecords: recordsByPage[currentPage],
      fetching,
      complete
    },
    {
      fetchPage,
      sort,
      getCurrentRecords: useCallback(() => recordsByPage[currentPage], [
        currentPage,
        recordsByPage
      ])
    }
  ];
};

export default useDataStore;
