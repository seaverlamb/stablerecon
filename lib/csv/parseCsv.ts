import Papa from "papaparse";

export function parseCsv<T>(
  file: File,
  requiredColumns: string[]
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,

      complete(results) {
        const fields = results.meta.fields ?? [];

        const missingColumns = requiredColumns.filter(
          (column) => !fields.includes(column)
        );

        if (missingColumns.length > 0) {
          reject(
            new Error(
              `Missing required columns: ${missingColumns.join(", ")}`
            )
          );
          return;
        }

        if (results.errors.length > 0) {
          reject(new Error(results.errors[0].message));
          return;
        }

        resolve(results.data);
      },

      error(error) {
        reject(error);
      },
    });
  });
}
