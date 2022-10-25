import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    // Get the presigned URL
    // localStorage.setItem(
    //   "authorization_token",
    //   "c2h2ZXRzYnk6VEVTVF9QQVNTV09SRA=="
    // );
    const token = localStorage.getItem("authorization_token");
    const auth = `Basic ${token}`;
    const response = await axios({
      method: "GET",
      headers: {
        Authorization: auth,
      },
      url,
      params: {
        name: encodeURIComponent(file?.name),
      },
    });
    console.log("File to upload: ", file?.name);
    //console.log("Uploading to: ", response.data);
    console.log("getSignedUrl: " + response.data.url);
    // const result = await fetch(response.data, {
    //   method: "PUT",
    //   body: file,
    // });
    // console.log("Result: ", result);
    setFile(undefined);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
