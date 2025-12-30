---
featureName: documentation
subfeatureName: tree
---

Context-aware documentation inclusion.

If your agent adds a file to the context, it will also include any documentation files from the same directory.

For example:

```
root
├── lib1
│   ├── Claude.md
│   └── lib1.source
├── lib2
│   ├── Claude.md
│   └── lib2.source
└── code.source
```

If `root/code.source` only uses `root/lib1/lib1.source`, then only `root/lib1/Claude.md` is added to the context. `root/lib2/Claude.md` is skipped.

**Supported agents:**

- Claude Code
- Cursor

