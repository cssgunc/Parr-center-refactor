import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
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

    (collection as jest.Mock).mockReturnValue({ type: "CollectionReference" });
    (doc as jest.Mock).mockReturnValue({ type: "DocumentReference" });
    (query as jest.Mock).mockReturnValue({ type: "Query" });
    (orderBy as jest.Mock).mockReturnValue({ type: "OrderBy" });
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
      (setDoc as jest.Mock).mockResolvedValue(undefined);
      (serverTimestamp as jest.Mock).mockReturnValue("TIMESTAMP");

      await updateModule("module123", { title: "Updated Title" });

      expect(setDoc).toHaveBeenCalledWith(
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

describe("Step CRUD Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (collection as jest.Mock).mockReturnValue({ type: "CollectionReference" });
    (doc as jest.Mock).mockReturnValue({ type: "DocumentReference" });
    (query as jest.Mock).mockReturnValue({ type: "Query" });
    (orderBy as jest.Mock).mockReturnValue({ type: "OrderBy" });
  });

  describe("createStep", () => {
    it("should create step and increment module stepCount", async () => {
      const mockStepRef = { id: "step123" };
      (addDoc as jest.Mock).mockResolvedValue(mockStepRef);
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ stepCount: 5 }),
      });
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      (serverTimestamp as jest.Mock).mockReturnValue("TIMESTAMP");

      const stepData = {
        type: "video",
        title: "Video Step",
        order: 10,
        isOptional: false,
        createdBy: "user123",
      };

      const result = await createStep("module123", stepData);

      expect(addDoc).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          stepCount: 6,
          updatedAt: "TIMESTAMP",
        })
      );
      expect(result.id).toBe("step123");
    });
  });

  describe("getStepsByModuleId", () => {
    it("should return steps ordered by order field", async () => {
      const mockSteps = [
        { id: "step1", data: () => ({ title: "Step 1", order: 10 }) },
        { id: "step2", data: () => ({ title: "Step 2", order: 20 }) },
      ];

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockSteps,
      });

      const result = await getStepsByModuleId("module123");

      expect(query).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalledWith("order", "asc");
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("step1");
    });
  });

  describe("deleteStep", () => {
    it("should delete step and decrement stepCount", async () => {
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ stepCount: 5 }),
      });
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      (serverTimestamp as jest.Mock).mockReturnValue("TIMESTAMP");

      await deleteStep("module123", "step123");

      expect(deleteDoc).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          stepCount: 4,
          updatedAt: "TIMESTAMP",
        })
      );
    });
  });
});
