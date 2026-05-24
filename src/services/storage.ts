import { supabase } from "@/lib/supabase";

export async function uploadIssueImage(
  file: File
) {
  const ext =
    file.name.split(".").pop();

  const filename =
    crypto.randomUUID() +
    "." +
    ext;

  const path =
    `issues/${filename}`;

  const { error } =
    await supabase.storage
      .from("issue-images")
      .upload(path,file);

  if(error){

    console.error(
      "UPLOAD ERROR:",
      error
    );

    throw error;
  }

  const { data } =
    supabase.storage
      .from("issue-images")
      .getPublicUrl(path);

  return data.publicUrl;
}