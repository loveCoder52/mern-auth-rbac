import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ProductImageUploader({ files, onChange, disabled = false }) {
  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = [];

    selectedFiles.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image type`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is larger than 5MB`);
        return;
      }

      validFiles.push(file);
    });

    if (files.length + validFiles.length > 6) {
      toast.error("You can upload up to 6 images per product");
    }

    onChange([...files, ...validFiles].slice(0, 6));
    event.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    onChange(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700">
        Product Images
      </label>

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={disabled}
        onChange={handleFiles}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 disabled:opacity-60"
      />

      <p className="text-xs text-slate-500">
        JPG, PNG, WEBP, or GIF. Maximum 6 images, 5MB each.
      </p>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <div key={`${preview.file.name}-${preview.file.lastModified}`} className="relative overflow-hidden rounded-lg border bg-slate-50">
              <img
                src={preview.url}
                alt={preview.file.name}
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
