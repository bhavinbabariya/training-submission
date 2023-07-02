export const setupDB = async (module) => {
  const userRepository = module.get('UserRepository');
  const productRepository = module.get('ProductRepository');
  await productRepository.delete({});
  await userRepository.delete({});
};
