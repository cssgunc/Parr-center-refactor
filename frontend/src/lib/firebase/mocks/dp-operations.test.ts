import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

// Mock Firebase modules
jest.mock("firebase/firestore");
jest.mock("../firebaseConfig");

import {
  createModule,
  getModuleById,
  updateModule,
  deleteModule,
  createStep,
  getStepsByModuleId,
  deleteStep,
} from "../db-operations";

describe("Module CRUD Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("createModule", () => {
    it("should create a module with correct data", async () => {
      const mockDocRef = { id: "module123" };
      (addDoc as jest.Mock).mockResolvedValue(mockDocRef);
      (serverTimestamp as jest.Mock).mockReturnValue("TIMESTAMP");

      const moduleData = {
        title: "Test Module",
        description: "Test Description",
        createdBy: "user123",
        isPublic: true,
        tags: ["test"],
      };

      const result = await createModule(moduleData);

      expect(addDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: "Test Module",
          description: "Test Description",
          createdBy: "user123",
          isPublic: true,
          tags: ["test"],
          stepCount: 0,
          createdAt: "TIMESTAMP",
          updatedAt: "TIMESTAMP",
        })
      );
      expect(result.id).toBe("module123");
    });
  });

  describe("getModuleById", () => {
    it("should retrieve a module by id", async () => {
      const mockData = {
        title: "Test Module",
        description: "Test",
        createdBy: "user123",
      };

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        id: "module123",
        data: () => mockData,
      });

      const result = await getModuleById("module123");

      expect(doc).toHaveBeenCalled();
      expect(getDoc).toHaveBeenCalled();
      expect(result.id).toBe("module123");
      expect(result.title).toBe("Test Module");
    });

    it("should throw error if module not found", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      await expect(getModuleById("nonexistent")).rejects.toThrow(
        "Module not found"
      );
    });
  });

  describe("updateModule", () => {
    it("should update module with new data", async () => {
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      (serverTimestamp as jest.Mock).mockReturnValue("TIMESTAMP");

      await updateModule("module123", { title: "Updated Title" });

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: "Updated Title",
          updatedAt: "TIMESTAMP",
        })
      );
    });
  });

  describe("deleteModule", () => {
    it("should delete module and all its steps", async () => {
      const mockSteps = [{ ref: "stepRef1" }, { ref: "stepRef2" }];

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockSteps,
      });

      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValue(undefined),
      };
      (writeBatch as jest.Mock).mockReturnValue(mockBatch);
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await deleteModule("module123", true);

      expect(getDocs).toHaveBeenCalled();
      expect(mockBatch.delete).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalled();
      expect(deleteDoc).toHaveBeenCalled();
    });
  });
});
