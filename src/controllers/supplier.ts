import SupplierModel from "../models/SupplierModel";

const getSuppliers = async (req: any, res: any) => {
  const { pageSize, page } = req.query;

  console.log(page, pageSize);
  try {
    const skip = (page - 1) * pageSize;

    const items = await SupplierModel.find({ isDeleted: false })
      .skip(skip)
      .limit(pageSize);

    const total = await SupplierModel.countDocuments();

    res.status(200).json({
      message: "Products",
      data: { total, items },
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const addNew = async (req: any, res: any) => {
  const body = req.body;
  try {
    const newSupplier = new SupplierModel(body);

    await newSupplier.save();

    res.status(200).json({
      message: "Add new supplier successfully",
      data: newSupplier,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const update = async (req: any, res: any) => {
  const body = req.body;

  const { id } = req.query;

  try {
    await SupplierModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Updated successfully",
      data: [],
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeSupplier = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await SupplierModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted successfully",
      data: [],
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

export { addNew, getSuppliers, update, removeSupplier };
