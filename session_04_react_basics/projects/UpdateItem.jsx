import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [message, setMessage] = useState(""); 

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setMessage(""); 
    }

    function saveEdit() {
        if (editName.trim() === "") {
            setMessage("⚠️ Tên không được để trống!");
            return;
        }
        if (editAge.trim() === "" || isNaN(parseInt(editAge))) {
            setMessage("⚠️ Tuổi phải là số!");
            return;
        }

        setItems(items.map(item =>
            item.id === editingId
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));

        setEditingId(null);
        setMessage("✅ Đã lưu thành công!");

        setTimeout(() => setMessage(""), 2000);
    }

    function cancelEdit() {
        setEditingId(null);
        setMessage("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>✏️ Sửa thông tin sinh viên</h2>
            {message && (
                <div style={{
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "4px",
                    backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
                    color: message.includes("✅") ? "#155724" : "#721c24"
                }}>
                    {message}
                </div>
            )}

            {items.map(item => (
                <div key={item.id} style={{
                    padding: "10px",
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderRadius: "4px"
                }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                style={{
                                    padding: "6px",
                                    border: "2px solid #3498db",  // Highlight xanh
                                    borderRadius: "4px",
                                    outline: "none",
                                    backgroundColor: "#e8f4fd"     // Nền xanh nhạt
                                }}
                                placeholder="Tên"
                            />
                            <input
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{
                                    padding: "6px",
                                    width: "70px",
                                    border: "2px solid #3498db",
                                    borderRadius: "4px",
                                    backgroundColor: "#e8f4fd"
                                }}
                                placeholder="Tuổi"
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                ✓ Lưu
                            </button>
                            <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                ✕ Hủy
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;