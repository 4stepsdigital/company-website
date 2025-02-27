import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css";
import AdminLayout from "@/Component/admin/AdminLayout";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Homefaq() {
  const [faqData, setFaqData] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");
  const [faqItem, setFaqItem] = useState({ title: "", information: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/home/home-faq");
        const data = await res.json();
        if (data.success) {
          setFaqData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setFaqItem((prev) => ({ ...prev, information: html }));
  };

  const addItem = () => {
    if (!faqItem.title || !faqItem.information) {
      setValidationError("Title and Information are required");
      return;
    }

    if (editingIndex !== null) {
      const updatedFaqs = [...faqData];
      updatedFaqs[editingIndex] = faqItem;
      setFaqData(updatedFaqs);
      setEditingIndex(null);
    } else {
      setFaqData((prev) => [...prev, faqItem]);
    }

    setFaqItem({ title: "", information: "" });
    setEditorHtml("");
    setValidationError("");
  };

  const editItem = (index) => {
    setEditingIndex(index);
    setFaqItem(faqData[index]);
    setEditorHtml(faqData[index].information);
  };

  const removeItem = (index) => {
    setFaqData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/home/home-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq: faqData }),
      });

      if (res.ok) {
        alert("FAQs saved successfully!");
      } else {
        throw new Error("Failed to save FAQs");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving FAQs.");
    }
  };

  return (
    <AdminLayout>
      <div>
        <p className="text-base font-semibold">FAQs</p>
        <div className="border bg-white p-3 rounded">
          <div className="border p-4 rounded-md bg-white mb-2">
            <label htmlFor="title" className="pb-2 font-base  font-semibold">
              Questions
            </label>
            <input
              className=" rounded-md h-8 px-2 w-full focus:border-primary outline"
              type="text"
              id="title"
              name="title"
              value={faqItem.title}
              onChange={handleChange}
              placeholder="Enter the Question"
            />
            <div className="mt-5">
              <span className=" font-base   font-semibold ">
                Enter Your Answer
              </span>
              <QuillNoSSRWrapper
                className="rounded h-48"
                theme="snow"
                value={editorHtml}
                placeholder="Enter Your Answer"
                onChange={handleEditorChange}
              />

              <div className=" mt-9">
                <button
                  onClick={addItem}
                  className="bg-primary text-white w-full mt-3 rounded px-4 py-2"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>

            <div>
              <p>Questions---</p>
              {faqData.length ? (
                faqData.map((item, index) => (
                  <div
                    key={index}
                    className="mt-1 flex justify-between even:bg-slate-50 p-2 rounded"
                  >
                    <p className="capitalize text-sm">
                      {index + 1}. {item.title}
                    </p>
                    <div className="flex gap-3">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer hover:text-primary"
                        onClick={() => editItem(index)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => removeItem(index)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No FAQs available.</p>
              )}
            </div>
            {validationError && (
              <span className="text-xs text-red-700 capitalize">
                {validationError}
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-black text-white rounded py-2 mt-4"
          >
            Save FAQs
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
