## How to check log on Liberty

Each Liberty server has its own log folder:

```
wlp/usr/servers/<server-name>/logs/
```
Inside, you’ll find several important files:
- messages.log → the main log (startup, deployment, application errors).
- console.log → standard output (similar to running the server in the foreground).
- ffdc/ → First Failure Data Capture; detailed dumps created when severe errors or exceptions occur.
- trace.log → trace log (enabled when tracing is configured, usually for detailed debugging).