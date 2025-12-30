---
featureName: documentation
subfeatureName: multi-file
---

Organize docs in separate files.

Sometimes it is better to split the documentation into multiple files.
For example:

```
root
├── .cursor
│   └── rules
│       └── deploy.mdc // describes how to deploy the project
│       └── lint.mdc // describes how to lint the project
│       └── test.mdc // describes how to test the project
├── lib1
│   ├── .cursor
│   │   └── rules
│   │       └── wasm.mdc // describes how to use the wasm library
│   │       └── js.mdc // describes how to use the js library
│   └── lib1.source
├── lib2
│   ├── Claude.md
│   └── lib2.source
└── code.source
```

---

If `root/code.source` uses `root/lib1/lib1.source`, the system context will be like:

```
<root/.cursor/rules/deploy.mdc>
<root/.cursor/rules/lint.mdc>
<root/.cursor/rules/test.mdc>

<root/lib1/.cursor/rules/wasm.mdc>
<root/lib1/.cursor/rules/js.mdc>
```

`root/lib2/Claude.md` is skipped because it is not part of imported files.

**Supported agents:**

- Cursor

