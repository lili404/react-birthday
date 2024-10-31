import {useEffect, useState} from 'react';

const useBirthday = () => {
  const [students, setStudents] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPages = async (url) => {
      try {
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json());

        //? production module (no idea if works)
        // setStudents((prevStudents) => [
        //   ...prevStudents,
        //   ...result.results
        //     .filter((item) => item.as_student.length > 0)
        //     .map((item) => ({
        //       ...item,
        //       as_student: [
        //         item.as_student.reduce((highest, current) =>
        //           current.grade > highest.grade ? current : highest
        //         ),
        //       ],
        //     })),
        // ]);

        // setWorkers((prevWorkers) => [
        //   ...prevWorkers,
        //   ...result.results.filter((item) => item.as_worker.length > 0),
        // ]);

        //? dev env workaround (duplicates issue)
        setStudents((prevStudents) => {
          const existingIds = new Set(prevStudents.map((item) => item.id));
          const newStudents = result.results
            .filter(
              (item) => item.as_student.length > 0 && !existingIds.has(item.id)
            )
            //? only hightest grades, remove if not needed
            .map((item) => ({
              ...item,
              as_student: [
                item.as_student.reduce((highest, current) =>
                  current.grade > highest.grade ? current : highest
                ),
              ],
            }));
          return [...prevStudents, ...newStudents];
        });

        setWorkers((prevWorkers) => {
          const existingIds = new Set(prevWorkers.map((item) => item.id));
          const newWorkers = result.results.filter(
            (item) => item.as_worker.length > 0 && !existingIds.has(item.id)
          );
          return [...prevWorkers, ...newWorkers];
        });

        if (result.next) {
          fetchAllPages(result.next);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAllPages('https://ksu24.kspu.edu/api/public_birthday/');
  }, []);

  return {students, workers, error};
};

export default useBirthday;
