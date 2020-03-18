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
  const { url, params, name } = init();
  const [records, setRecords] = useState([]);
  const [recordsByPage, setRecordsByPage] = useState([]);
  const [recordsCount, setRecordsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(() => getUrl(url, params));

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);

  const reset = () => {
    setRecords([]);
    setRecordsCount(1);
    setNextUrl("");
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
    console.error(err);
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
      console.log("page", page);
      if (recordsByPage[page]) {
        return setCurrentPage(page);
      }

      const newParams = {
        ...params,
        page
      };
      const newURL = getUrl(url, newParams);

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

  const fetchNextPage = useCallback(() => {
    setFetching(true);
    return fetchWithUrl(nextUrl)
      .then(resp => resp.json())
      .then(resp => {
        onFetchSuccess(resp);
        return resp;
      })
      .catch(err => {
        onFetchFail(err);
        return err;
      });
  }, [fetchWithUrl, nextUrl, onFetchFail, onFetchSuccess]);

  const localSort = sortOrder =>
    new Promise(resolve => {
      const sorted = records.sort((a, b) => {
        let order;

        sortOrder.some(sortBy => {
          if (a[sortBy] < b[sortBy]) {
            order = -1;
            return true;
          }
          if (a[sortBy] > b[sortBy]) {
            order = 1;
            return true;
          }
          order = 0;
          return false;
        });

        return order;
      });
      setRecords(sorted);
      resolve();
    });

  const remoteSort = sortOrder => {
    const newParams = {
      ...params,
      sort: sortOrder.join(",")
    };
    const newURL = getUrl(url, newParams);
    setNextUrl(newURL);
  };

  const sort = sortOrder => {
    if (complete) {
      return localSort(sortOrder);
    }
    reset();
    return remoteSort(sortOrder);
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
      fetchNextPage,
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
