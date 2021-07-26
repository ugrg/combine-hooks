function combineHooks<Hooks extends { [key: string]: (initialState: any) => any }> (hooks: Hooks) {
  return (defaultValue: Record<string, any> | null = {}) => Object.entries(hooks)
    .reduce((store, [nameSpace, useHook]) => Object.assign(store,
      { [nameSpace]: useHook(defaultValue ? defaultValue[nameSpace] : undefined) }
      ), {}
    ) as { [name in keyof Hooks]: ReturnType<Hooks[name]> };
}

export default combineHooks;
export { combineHooks };
