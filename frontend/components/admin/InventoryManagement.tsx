"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Edit, RefreshCw, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface InventoryItem {
  productId: string;
  productName: string;
  availableQuantity: number;
  reservedQuantity?: number;
  lastUpdated?: string;
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [addQuantity, setAddQuantity] = useState<number>(0);
  const [addingProduct, setAddingProduct] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ productId: "", productName: "", quantity: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchInventory();
    
    // Listen for refresh events (e.g., when payment status is updated)
    const handleRefresh = () => {
      fetchInventory();
    };
    
    window.addEventListener("refreshInventory", handleRefresh);
    
    return () => {
      window.removeEventListener("refreshInventory", handleRefresh);
    };
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventory");
      const data = await response.json();
      if (data.success) {
        setInventory(data.inventory || []);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setMessage({ type: "error", text: "Failed to load inventory" });
    } finally {
      setLoading(false);
    }
  };

  const handleSetQuantity = async (productId: string, productName: string) => {
    if (editQuantity < 0) {
      setMessage({ type: "error", text: "Quantity cannot be negative" });
      return;
    }

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          availableQuantity: editQuantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: `Inventory updated to ${editQuantity} kg for ${productName}` });
        setEditingProduct(null);
        await fetchInventory();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update inventory" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update inventory" });
    }
  };

  const handleAddQuantity = async (productId: string, productName: string) => {
    if (addQuantity <= 0) {
      setMessage({ type: "error", text: "Quantity to add must be greater than 0" });
      return;
    }

    try {
      const response = await fetch("/api/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          quantityToAdd: addQuantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: `Added ${addQuantity} kg to ${productName}. New total: ${data.inventory?.availableQuantity || 0} kg` });
        setAddingProduct(null);
        setAddQuantity(0);
        await fetchInventory();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to add inventory" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to add inventory" });
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.productId || !newProduct.productName || newProduct.quantity <= 0) {
      setMessage({ type: "error", text: "Please fill in all fields with valid values" });
      return;
    }

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: newProduct.productId,
          productName: newProduct.productName,
          availableQuantity: newProduct.quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: `Created ${newProduct.productName} with ${newProduct.quantity} kg` });
        setNewProduct({ productId: "", productName: "", quantity: 0 });
        await fetchInventory();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create product" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to create product" });
    }
  };

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        <button
          onClick={fetchInventory}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <p>{message.text}</p>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add New Product */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary-600" />
          Add New Product to Inventory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product ID
            </label>
            <input
              type="text"
              value={newProduct.productId}
              onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
              placeholder="e.g., bugoyi-washed"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={newProduct.productName}
              onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
              placeholder="e.g., Bugoyi Washed"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initial Quantity (kg)
            </label>
            <input
              type="number"
              value={newProduct.quantity || ""}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: parseFloat(e.target.value) || 0 })}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreateProduct}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading inventory...</p>
        </div>
      ) : inventory.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No inventory items found. Add a product above to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {inventory.length} product(s)
          </div>
          {inventory.map((item) => (
            <div
              key={item.productId}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.productName}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({item.productId})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ml-8">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Available: </span>
                      <span className={`text-lg font-bold ${
                        item.availableQuantity > 1000 
                          ? "text-green-600 dark:text-green-400" 
                          : item.availableQuantity > 500
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {item.availableQuantity.toLocaleString()} kg
                      </span>
                    </div>
                    {item.reservedQuantity && item.reservedQuantity > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Reserved: </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.reservedQuantity.toLocaleString()} kg
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Last Updated: </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {formatDate(item.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Add Quantity */}
                {addingProduct === item.productId ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="number"
                      value={addQuantity || ""}
                      onChange={(e) => setAddQuantity(parseFloat(e.target.value) || 0)}
                      placeholder="kg to add"
                      min="0.01"
                      step="0.01"
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    />
                    <button
                      onClick={() => handleAddQuantity(item.productId, item.productName)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Add
                    </button>
                    <button
                      onClick={() => {
                        setAddingProduct(null);
                        setAddQuantity(0);
                      }}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAddingProduct(item.productId);
                      setAddQuantity(0);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Stock
                  </button>
                )}

                {/* Set Quantity */}
                {editingProduct === item.productId ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="number"
                      value={editQuantity || ""}
                      onChange={(e) => setEditQuantity(parseFloat(e.target.value) || 0)}
                      placeholder="set to (kg)"
                      min="0"
                      step="0.01"
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    />
                    <button
                      onClick={() => handleSetQuantity(item.productId, item.productName)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Set Quantity
                    </button>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setEditQuantity(0);
                      }}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingProduct(item.productId);
                      setEditQuantity(item.availableQuantity);
                      setAddingProduct(null);
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Set Quantity
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

