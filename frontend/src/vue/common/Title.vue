<script>
export default {
  props: ["title"],
  render() {
    document.title = `${this.title} - Flaskr`;
  }
};
</script>
