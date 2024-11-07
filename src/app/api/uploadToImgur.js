import imgur from "imgur";

imgur.setClientId(process.env.IMGUR_CLIENT_ID);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    const response = await imgur.uploadBase64(image);
    return res.status(200).json({ link: response.data.link }); // Return the Imgur URL
  } catch (error) {
    console.error("Error uploading to Imgur:", error);
    return res.status(500).json({ message: "Failed to upload image" });
  }
}
