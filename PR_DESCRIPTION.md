# 🔒 [security fix description]

🎯 **What:**
Fixed a vulnerability/linting issue in `src/components/Tutorial.tsx` where `parseInt` was being called without a radix parameter.

⚠️ **Risk:**
When `parseInt` is called without a radix parameter, strings starting with certain characters (like `0` or `0x`) could be interpreted as octal or hexadecimal, respectively, in older JavaScript environments. Even in modern environments where it defaults to base-10, it's a security/linting best practice to explicitly specify the radix to avoid any ambiguity, potential unexpected parsing behavior, or exploitation through crafted inputs.

🛡️ **Solution:**
Added the base-10 radix parameter (`10`) to both instances of `parseInt` on lines 61 and 62 in `src/components/Tutorial.tsx`. This ensures that characters are always parsed explicitly as base-10 integers, resolving the security/linting issue while preserving existing functionality.